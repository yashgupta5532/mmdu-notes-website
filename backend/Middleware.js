

// const isAdmin = (req, res, next) => {
//   // Assuming your user object has an "isAdmin" property that's either true or false
//   console.log("admin -->",req.user,req.user.isAdmin)
//   if (req.user && req.user.isAdmin === true) {
//     return next(); // Allow access to admin routes
//   }
//   res.status(403).json({ error: "Access denied" });
// };

// export { isAdmin };