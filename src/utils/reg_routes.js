const { WRONG_HTTP_METHOD } = require("../utils/error_codes");
const { protect, restrictTo } = require("../middlewares/authRole");
const {uploadFile,saveImage,uploadEasyPaiseFile} =require('../middlewares/fileUploader')
const register_route = ({
  router,
  route,
  auth_enable = false,
  admin_auth_enable = false,
  user_auth_enable = false,
  services_provider_auth_enable = false,
  services_provider_admin_auth_enable = false,
  validate = false,
  fileUploader = false,
  fileUploaderForEasyPaise = false,
  get_method,
  post_method,
  patch_method,
  delete_method,
}) => {
  if (!router || !route) return; // Guard clause for undefined

  const args = [route];
  if (auth_enable) args.push(protect);
  if (admin_auth_enable) args.push(restrictTo('admin'));
  if (user_auth_enable) args.push(restrictTo('user'));
  if (services_provider_auth_enable) args.push(restrictTo('serviceProvider'));
  if (services_provider_admin_auth_enable){
    args.push(restrictTo('admin','serviceProvider'));

  } 
  if(validate){
    args.push(validate);
  }
if(fileUploader){
  args.push(uploadFile(),saveImage)
}if(fileUploaderForEasyPaise){
  args.push(uploadEasyPaiseFile(),saveImage)
}
  // Register GET method if defined
  if (get_method) {
    router.get(...args, get_method);
  }

  // Register POST method if defined
  if (post_method) {
    router.post(...args, post_method);
  }

  // Register PATCH method if defined
  if (patch_method) {
    router.patch(...args, patch_method);
  }

  // Register DELETE method if defined
  if (delete_method) {
    router.delete(...args, delete_method);
  }
};

module.exports = {
  register_route,
};
