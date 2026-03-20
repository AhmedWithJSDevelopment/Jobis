const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

const envPath = './.env';

// دالة توليد 256-bit
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

const ensureJWTSecret = () => {
  if (!process.env.JWT_SECRET) {
    const newSecret = generateSecret();

    console.log("🔐 Generating new JWT_SECRET...");

    // إذا الملف موجود → أضف
    if (fs.existsSync(envPath)) {
      fs.appendFileSync(envPath, `\nJWT_SECRET=${newSecret}`);
    } else {
      // إذا غير موجود → أنشئه
      fs.writeFileSync(envPath, `JWT_SECRET=${newSecret}`);
    }

    process.env.JWT_SECRET = newSecret;
  } else {
    console.log("✅ JWT_SECRET already exists");
  }
};

ensureJWTSecret();