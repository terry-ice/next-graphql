const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mutation = {
  createItem(parent, args, ctx, info) {
    const item = ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    console.log(item);
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const update = { ...args };
    delete update.id;
    return ctx.db.mutation.updateItem(
      {
        data: update,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    const item = await ctx.db.query.item(
      { where },
      `{
      id
      title
    }`
    );
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // console.log(token,token,'000000')
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
//   async signin(parent, { email, password }, ctx, info) {
//     console.log(email,'email11')
//     console.log(password,'password11')
//     const user = await ctx.db.query.user({ where: { email } });
//     if (!user) {
//       throw new Error(`no such user found for email${email}`);
//     }
//     const valid = await bcrypt.compare(password, user.password);
//     console.log(valid);
//     if (!valid) {
//       throw new Error(`invalid password`);
//     }
//     const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
//     // We set the jwt as a cookie on the response
//     ctx.response.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
//     });
//     return user;
//   }
  // async signup(parent,args,ctx,info){
  //   args.email = args.email.toLowerCase();
  //   args.password = 'qq1011';

  //   // hash('qq1011') = '123456';
  //   const password = await bcrypt.hash(args.password,10);

  //   const user = await ctx.db.mutation.createUser({
  //     data:{
  //       ...args,
  //       password: password,
  //       permissions: {set: ['USER']},

  //     }
  //   },info);
  //   const token = jwt.sign({
  //     userId: user.id
  //   },process.env.APP_SECRET)
  //   ctx.response.cookie('token', token,{
  //     httpOnly: true,
  //     maxAge: 1000*60*60*24*365
  //   });
  //   return user;

  // }
};

module.exports = Mutation;
