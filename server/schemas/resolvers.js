const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        console.log("QUERY ME TESTING");
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
      
          return userData;
        }
        throw new AuthenticationError('Not logged in');
      }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
    console.log(user, token)
    
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
          throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password);
      if(!correctPw) {
          throw new AuthenticationError('Incorrect credentials')
      }
      
      const token = signToken(user);
      return { token, user };
  },
          saveMovie: async (parent, { movieData }, context) => {
            console.log("Hello world")
            console.log(context);
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {savedMovies: movieData} },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        removeMovie: async (parent, { movieId }, context) => {
          if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                  {_id: context.user._id},
                  { $pull: { savedMovies: { movieId: movieId } } },
                  { new: true }
              )
              return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!'); 
      }
    }
};

module.exports = resolvers;