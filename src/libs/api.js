// src/utils/api.js
import { apiUrl } from "./constants";

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */

function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem("jwt")) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
  }
  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

/** 
 * Fetch all listings
 */
export async function fetchAllListings() {
  try {
    const res = await fetch(`${apiUrl}/listings`);
    return res.json();
  } catch (err) {
    console.error(err);
  }
}

/** * Sign up user - register page */
export async function registerUser({ email, password, username }) {
  const url = new URL(`${apiUrl}/auth/register`);

  const userData = {
    name: username,
    email,
    password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("jwt", data.accessToken);
    localStorage.setItem("userId", data.name);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** * Login user - login page */
export async function loginUser(email, password) {
  const url = new URL(`${apiUrl}/auth/login`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("jwt", data.accessToken);
    localStorage.setItem("userId", data.userId);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProfile(userName) {
  const apiUser = `${apiUrl}/profiles/${userName}?_listings=true`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  try {
    const response = await fetch(apiUser, options);

    if (response.ok) {
      const userProfile = await response.json();
      return userProfile;
    } else {
      throw new Error('Failed to fetch user profile. Please try again later.');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user_name');
  localStorage.removeItem('credits');
  localStorage.removeItem('avatar');
}
