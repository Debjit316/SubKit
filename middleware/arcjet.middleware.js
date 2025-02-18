import aj from "../config/arcjet.js";

const arcMiddleware = async (req, res, next) => {
  try {
    // Decide if the req needs to be denied or passed through
    // requested field is the number of tokens to be deducted from the bucket
    const dec = await aj.protect(req, { requested: 1 });

    if (dec.isDenied()) {
      if (dec.reason.isRateLimit()) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
      if (dec.reason.isBot()) {
        return res
          .status(403)
          .json({ error: "Bot detected !! No bots allowed" });
      }

      return res.status(403).json({ error: "Access Denied" });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcMiddleware;
