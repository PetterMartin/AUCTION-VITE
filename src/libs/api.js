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
    const response = await fetch(`${apiUrl}/listings?sort=created&sortOrder=desc`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    });

    // Check if the response status is OK (200)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch listings. Status: ${response.status}`);
    }
  } catch (error) {
    // Handle fetch errors
    console.error('Error fetching listings:', error);
  }
}

export async function fetchListingById(listingId) {
  const url = new URL(`${apiUrl}/listings/${listingId}?_bids=true&_seller=true`);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data; // Return the entire data object
    } else {
      console.error(`Failed to fetch. Status: ${response.status}`);
    }
  } catch (error) {
    // Handle fetch errors
    console.error('Error fetching listing:', error);
  }
}

/** * Sign up user - register page */
export async function registerUser({ email, password, username, avatar }) {
  const url = new URL(`${apiUrl}/auth/register`);

  const userData = {
    name: username,
    email,
    password,
    avatar,
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
  const apiUser = `${apiUrl}/profiles/${userName}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  try {
    const response = await fetch(`${apiUser}?_listings=true`, options);

    if (response.ok) {
      const userProfile = await response.json();
      return userProfile;
    } else {
      throw new Error('Failed to fetch user profile. Please try again later.');
    }
  } catch (error) {
    return null;
  }
}

export async function fetchProfileByName(profileName) {
  const url = new URL(`${apiUrl}/profiles/${profileName}`);
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch profile. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}


export async function getProfileListings(userName) {
  const apiUserListings = `${apiUrl}/profiles/${userName}/listings?sort=created&sortOrder=desc`; // Adjust the endpoint

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  try {
    const response = await fetch(apiUserListings, options);

    if (response.ok) {
      const userListingData = await response.json();
      return userListingData;
    } else {
      throw new Error('Failed to fetch user listings. Please try again later.');
    }
  } catch (error) {
    console.error('Error fetching user listings:', error);
    return null;
  }
}

export async function updateProfileImage(user, imageUrl, token) {
  const URL = `${apiUrl}/profiles/${user}/media`;
  const response = await fetcher(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ avatar: imageUrl }),
  });

  return response;
}

export async function fetchBidsForListing(listingId) {
  const url = new URL(`${apiUrl}/listings/${listingId}/bids`);

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch bids for listing. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching bids for listing:', error);
  }
}

export async function submitBid(listingId, bidAmount) {
  const url = new URL(`${apiUrl}/listings/${listingId}/bids`);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      amount: bidAmount,
    }),
  };

  try {
    const response = await fetch(url, options);

    // Log the entire response for debugging
    console.log("Bid response:", response);

    if (response.ok) {
      const data = await response.json();
      return { ok: true, data }; // Return an object with 'ok' flag and data
    } else {
      const errorData = await response.json();
      console.error(`Failed to submit bid. Status: ${response.status}, Error: ${JSON.stringify(errorData)}`);
      return { ok: false, error: errorData }; // Return an object with 'ok' flag and error data
    }
  } catch (error) {
    console.error('Error submitting bid:', error);
    throw new Error(error);
  }
}





export function logoutUser() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user_name');
  localStorage.removeItem('credits');
  localStorage.removeItem('avatar');
}

