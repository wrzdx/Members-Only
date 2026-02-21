const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect("/sign-in")
}

const checkIsAdmin = (req, res, next) => {
  if (req.user?.is_admin) {
    return next()
  }

  res.redirect("/")
}

export { checkAuthentication, checkIsAdmin }
