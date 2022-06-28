const assert = require('assert');
const validate = require('jsonschema').validate;
const fs = require('fs');
const path = require('path');

function readFile(filename: string) {
  return JSON.parse(fs.readFileSync(path.resolve(filename)));
}

interface DynamicList {
  items: any[];
  has_more: boolean;
  offset: string;
  update_baseline: string;
  update_num: number;
}

describe('B站动态解析', function() {
  it('验证动态是否完全可解析', function() {
    const list = readFile('test/data/dynamic-list.json') as DynamicList;
    for (const item of list.items) {
      const result = validate(item, readFile('gen/schema.json'), {allowUnknownAttributes: false, nestedErrors: true});
      assert.equal(result.errors.length, 0);
    }
  });
});

