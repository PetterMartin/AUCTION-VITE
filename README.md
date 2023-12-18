# React + Vite

![image](/src//assets//Screenshot.png)



### Overview

This project involves the development of a React.js front-end client for an auction website. The primary objectives were to create an attractive and responsive user interface, implement secure user authentication, allow the user to create and make bids on listings, and seamlessly integrate with the provided API.

### Developer

- Petter Martin Ånderbakk

### Approach

The project utilized React.js, emphasizing a modular and component-based architecture. JSON Web Tokens (JWT) were employed for secure user authentication, with LocalStorage ensuring persistent token storage for an enhanced user experience.

## Built with

- ReactJs https://react.dev/
- Vite https://vitejs.dev/
- TailwindCSS https://tailwindcss.com/
- Components from ShadCN https://ui.shadcn.com/
- Toast components from: Sonner https://sonner.emilkowal.ski/
- Icons from: React icons https://react-icons.github.io/react-icons/
- TanStack Query https://tanstack.com/query/latest
- TanStack Router https://tanstack.com/router/v1

### Key Features

1. **User Authentication:**
   - Registration and authentication restricted to specific email domains (@noroff.no or @stud.noroff.no).
2. **Content Feed:**
   - Dynamic content feed with search functionality.
3. **Post Management:**
   - Create, edit, delete, bid and view listings in detail.

   ### Challenges & Achievements

- Successful API integration, including authentication and various HTTP methods.
- User Experience Focus: Prioritization of user experience resulted in an intuitive and engaging interface.

### Future Plans

- Implement additional profile customization features.
- Enhanced filtering system for listings.

## Getting started

### Installing

```bash
git clone git@github.com:PetterMartin/AUCTION-VITE.git
```

Install dependencies

```bash
npm i
```

### Running

First create a file in the root of the project called ".env.local" and paste this: VITE_API_URL="https://api.noroff.dev/api/v1/auction"

then:

```bash
npm run dev
```

### Testing

First create an account to use for testing.
Then create a file in the root of the project called "cypress.env.json".

Paste this:
{ "email": "\_EMAIL", "password": "\_PASSWORD" }

And replace \_EMAIL and \_PASSWORD with your test account details.

## Conclusion

The project was successfully completed, enhancing my technical skills and emphasizing collaboration and user-centered design. This experience has equipped me for future web development challenges.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## [REPORT] Auction House Front-End Client