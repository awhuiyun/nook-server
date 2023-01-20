// Set up file for Notion calls; Remember to import into index.js
const { Client } = require("@notionhq/client");

// Set up new notion instance
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getData(id) {
  let results = [];

  let data = await notion.blocks.children.list({
    block_id: id,
  });
  results = [...data.results];

  while (data.has_more === true) {
    data = await notion.blocks.children.list({
      block_id: id,
      start_cursor: data.next_cursor,
    });

    results = [...results, ...data.results];
  }

  return results;
}

module.exports = {
  getData,
};
