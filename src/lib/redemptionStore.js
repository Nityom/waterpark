import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const redemptionFile = path.join(dataDir, "redeemed-tickets.json");

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(redemptionFile, "utf8");
  } catch {
    await writeFile(redemptionFile, JSON.stringify({}, null, 2), "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await readFile(redemptionFile, "utf8");
  return raw ? JSON.parse(raw) : {};
}

async function writeStore(store) {
  await ensureStore();
  await writeFile(redemptionFile, JSON.stringify(store, null, 2), "utf8");
}

export async function getRedeemedTicket(orderId) {
  const store = await readStore();
  return store[orderId] || null;
}

export async function redeemTicket(orderId, payload) {
  const store = await readStore();

  if (store[orderId]) {
    return {
      alreadyRedeemed: true,
      record: store[orderId],
    };
  }

  const record = {
    redeemedAt: new Date().toISOString(),
    ...payload,
  };

  store[orderId] = record;
  await writeStore(store);

  return {
    alreadyRedeemed: false,
    record,
  };
}
