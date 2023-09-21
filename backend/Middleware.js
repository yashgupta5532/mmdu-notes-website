

// const isAdmin = (req, res, next) => {
//     // Assuming you store user information in req.user after authentication
//     const user = req.user;
  
//     if (user && user.isAdmin) {
//       // User is an admin, proceed to the next middleware or route handler
//       next();
//     } else {
//       // User is not an admin, send a 403 Forbidden response
//       res.status(403).json({ error: 'Access denied. You are not an admin.' });
//     }
//   };

// export { isAdmin };