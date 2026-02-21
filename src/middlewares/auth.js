const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect("/sign-in")
}

export { checkAuthentication }
