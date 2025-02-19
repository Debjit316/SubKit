import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

// import { serve } from "@upstash/workflow/express";
// import Subscription from "../models/subscription.model.js";
import subsModel from "../models/subscription.model.js";
import { sendRemEmail } from "../utils/send-email.js";
// import { sendReminderEmail } from "../utils/send-email.js";

const REMINDERS = [10, 7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
  console.error("sendReminders method is called");
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }

    // if (
    //   subscription.reminderSent &&
    //   subscription.reminderSent.includes(daysBefore)
    // ) {
    //   console.log(`Reminder for ${daysBefore} days already sent; skipping.`);
    //   break;
    // }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(
        context,
        `${daysBefore} days before reminder`,
        subscription
      );
    }

    break;
    // }
  }
});

// Example: Update your fetchSubscription function
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return await subsModel
      .findById(subscriptionId)
      .populate("user", "name email");
  });
};

// const fetchSubscription = async (context, subscriptionId) => {
//   return await context.run("get subscription", async () => {
//     return await subsModel
//       .findById(subscriptionId)
//       .populate("user", "name email");
//   });
// };

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendRemEmail({
      to: subscription.user.email,
      type: label,
      subs: subscription,
    });

    // const daysValue = parseInt(label.split(" ")[0]);

    // if (!subscription.reminderSent.includes(daysValue)) {
    //   await subsModel.findByIdAndUpdate(
    //     subscription._id,
    //     { $push: { reminderSent: daysValue } },
    //     { new: true }
    //   );
    //   console.log(`Updated reminderSent with value: ${daysValue}`);
    // }
  });
};
