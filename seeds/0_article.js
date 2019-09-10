exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("articles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("articles").insert([
        {
          title: "The Ultimate Productivity Hack is Saying No.",
          author: "James Clear",
          body:
            "The Power of 'No'. More effort is wasted doing things that don't matter than is wasted doing things inefficiently. And if that is the case, elimination is a more useful skill than optimization. I am reminded of the famous Peter Drucker quote, There is nothing so useless as doing efficiently that which should not be done at all.",
          url: "The%20Ultimate%20Productivity%20Hack%20is%20Saying%20No."
        },
        {
          title: "How Innovative Ideas Arise.",
          author: "James Clear",
          body:
            "We are mostly blind to the remarkable interconnectedness of things. This is important to understand because in a complex world it is hard to see which forces are working for you as well as which forces are working against you. Similar to buying a toaster, we tend to focus on the final product and fail to recognize the many processes leading up to it. When you are dealing with a complex problem, it is usually better to build upon what already works. Any idea that is currently working has passed a lot of tests. Old ideas are a secret weapon because they have already managed to survive in a complex world. Iterate, don't originate.",
          url: "How%20Innovative%20Ideas%20Arise."
        },
        {
          title: "Absolute Success is Luck. Relative Success is Hard Work.",
          author: "James Clear",
          body:
            "You can increase your surface area for good luck by taking action.  The forager who explores widely will find lots of useless terrain, but is also more likely to stumble across a bountiful berry patch than the person who stays home. Similarly, the person who works hard, pursues opportunity, and tries more things is more likely to stumble across a lucky break than the person who waits. Gary Player, the famous golfer and winner of nine major championships, has said, “The harder I practice, the luckier I get.”",
          url:
            "Absolute%20Success%20is%20Luck.%20Relative%20Success%20is%20Hard%20Work."
        }
      ]);
    });
};
