const jwt = require('jsonwebtoken');
module.exports.admin_middleware = async(req, res, next) => {
   const { blog_token } = req.cookies;
   if (!blog_token) {
      return res.status(404).json({ errorMessage: { error: "Please login first" } });
   } else {
      const deCodeToken = await jwt.verify(blog_token,'zihadulid');
      // console.log(deCodeToken)
      req.adminId = deCodeToken.id;
      req.adminName  = deCodeToken.name;
      req.role = deCodeToken.role
      next();
   }
}