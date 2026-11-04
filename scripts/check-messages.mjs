import fs from "node:fs";
import path from "node:path";

const LOCALES = ["id", "en", "zh", "zh-TW", "ko"];
const MESSAGES_DIR = path.resolve(process.cwd(), "messages");

function getFlatKeys(obj, prefix = "") {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys = keys.concat(getFlatKeys(value, fullKey));
    } else if (Array.isArray(value)) {
      keys.push(`${fullKey}[]`);
      // check structure of array elements if they are objects
      if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        keys = keys.concat(getFlatKeys(value[0], `${fullKey}[]`));
      }
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

const dictionaries = {};
for (const locale of LOCALES) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File missing: ${filePath}`);
    process.exit(1);
  }
  dictionaries[locale] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const baseKeys = getFlatKeys(dictionaries.id);
console.log(`Base locale (id) key count: ${baseKeys.length}`);

let hasMismatch = false;

for (const locale of LOCALES) {
  if (locale === "id") continue;
  const currentKeys = getFlatKeys(dictionaries[locale]);
  
  const missingInCurrent = baseKeys.filter((k) => !currentKeys.includes(k));
  const extraInCurrent = currentKeys.filter((k) => !baseKeys.includes(k));

  if (missingInCurrent.length > 0) {
    console.error(`[FAIL] ${locale} is missing ${missingInCurrent.length} keys:`);
    missingInCurrent.slice(0, 10).forEach((k) => console.error(`  - ${k}`));
    hasMismatch = true;
  }
  if (extraInCurrent.length > 0) {
    console.error(`[FAIL] ${locale} has ${extraInCurrent.length} extra keys:`);
    extraInCurrent.slice(0, 10).forEach((k) => console.error(`  + ${k}`));
    hasMismatch = true;
  }
  if (missingInCurrent.length === 0 && extraInCurrent.length === 0) {
    console.log(`[PASS] ${locale} keys strictly match id (${currentKeys.length} keys)`);
  }
}

if (hasMismatch) {
  console.error("Message key verification failed!");
  process.exit(1);
} else {
  console.log("All 5 message dictionaries are 100% synchronized and identical in keys.");
}
