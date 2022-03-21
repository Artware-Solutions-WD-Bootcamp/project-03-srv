const verifyUsernameNotInUse = (username) => {
    //? verify if username has already been registered
    const foundUserName = await UserModel.findOne({ username });
    if (foundUserName) {
      res.status(400).json({
        errorMessage:
          "This username is already in use. Please try with another one!",
      });
      return;
    }
}


export { verifyUsernameNotInUse,  }