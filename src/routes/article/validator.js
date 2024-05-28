const expressValidation = require("express-validator");
const check = expressValidation.check;

module.exports = new (class {
    CreatreArticleValidation(){
        return [
          check('title').not().isEmpty().withMessage("Title couldn't be empty"),
          check('content').not().isEmpty().withMessage("Content couldn't be empty")  
        ]
    }
})();
