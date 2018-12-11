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
  }
};

module.exports = Mutation;
