import * as assert from 'assert';
import { validate } from 'jsonschema';
import * as fs from 'fs';
import * as path from 'path';
import { Config, createGenerator } from 'ts-json-schema-generator';



const config: Config = {
  path: './src/types/dynamic/Dynamic.ts',
  tsconfig: './tsconfig.json',
  type: 'DynamicItem',
  expose: 'all',
  strictTuples: true,
  encodeRefs: false,
};

const schema = createGenerator(config).createSchema(config.type);

function readFile(filename: string) {
  return JSON.parse(fs.readFileSync(path.resolve(filename)).toString());
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
      const result = validate(item, schema, {allowUnknownAttributes: false, nestedErrors: true});
      assert.equal(result.errors.length, 0);
    }
  });
});

