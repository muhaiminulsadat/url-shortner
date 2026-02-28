"use server";

import {nanoid} from "nanoid";
import URL from "@/models/url.model";
import connectDB from "@/lib/db";

export async function createLink({
  title,
  original_url,
  custom_url,
  qr,
  userId,
}) {
  try {
    await connectDB();

    const short_url = nanoid(6);

    const link = await URL.create({
      title,
      original_url,
      short_url,
      custom_url: custom_url || undefined,
      qr,
      userId: userId || undefined,
    });

    return {success: true, data: JSON.parse(JSON.stringify(link))};
  } catch (err) {
    if (err.code === 11000) {
      return {success: false, message: "Custom URL already taken"};
    }
    return {success: false, message: err.message};
  }
}

// actions/link.actions.js
export async function getLinks(userId) {
  try {
    await connectDB();
    const links = await URL.find({userId}).sort({createdAt: -1}).lean();
    return {success: true, data: JSON.parse(JSON.stringify(links))};
  } catch (err) {
    return {success: false, message: err.message};
  }
}

export async function getLinkBySlug(slug) {
  try {
    await connectDB();
    const link = await URL.findOne({
      $or: [{custom_url: slug}, {short_url: slug}],
    }).lean();
    return {success: true, data: JSON.parse(JSON.stringify(link))};
  } catch (err) {
    return {success: false, message: err.message};
  }
}

// actions/link.actions.js
export async function deleteLink(id) {
  try {
    await connectDB();
    await URL.findByIdAndDelete(id);
    return {success: true};
  } catch (err) {
    return {success: false, message: err.message};
  }
}
