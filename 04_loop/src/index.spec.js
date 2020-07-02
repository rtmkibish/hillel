const { getXmasTree } = require('./index');

test('Xmas tree height 5', () => {
    expect(getXmasTree(5, '$')).toBe(`    $
   $$$
  $$$$$
 $$$$$$$
$$$$$$$$$
`)
})