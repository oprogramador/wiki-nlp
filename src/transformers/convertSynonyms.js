const _ = require('lodash');
const toLowerCase = require('../utils/toLowerCase');
const { getLast, withoutLast } = require('../utils/listUtils');

const convertNow = now => [
  'on',
  {
    day: now.getDate(),
    groupType: 'date',
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  },
];

const generateMap = () => [
  ..._.times(
    20, i => ({
      from: ['early', 'in', 'the', `${i + 4}th`, 'century'],
      to: ['in', 'the', 'early', `${i + 4}th`, 'century'],
    }),
  ),
];

const createDefaultMap = ({ now }) => [
  ...generateMap(),
  { from: ['&'], to: ['and'] },
  { from: [',', 'are'], to: ['are'] },
  { from: [',', 'colloquially', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'currently', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'excluding'], to: ['excluding'] },
  { from: [',', 'formerly', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'historically', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'in', 'fact', ','], to: [] },
  { from: [',', 'including'], to: ['including'] },
  { from: [',', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'meanwhile', ','], to: [] },
  { from: [',', 'officially', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'on', 'the', 'other', 'hand', ','], to: [] },
  { from: [',', 'on', 'the', 'other', 'hand'], to: [] },
  { from: [',', 'originally', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: [',', 'popularly', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'previously', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'simply', 'known', 'as'], to: ['#alternative-name'] },
  { from: [',', 'sometimes', 'known', 'as'], to: ['#alternative-name'] },
  { from: ['1st'], to: ['first'] },
  { from: ['21st'], to: ['twenty-first'] },
  { from: ['2nd'], to: ['second'] },
  { from: ['3rd'], to: ['third'] },
  { from: ['a', 'few', 'hundred'], to: ['101–1000'] },
  { from: ['a', 'few'], to: ['several'] },
  { from: ['a', 'half', 'of', 'a', 'million'], to: ['5e5'] },
  { from: ['a', 'half', 'of', 'the'], to: ['50', '%', 'of', 'the'] },
  { from: ['a', 'half', 'the'], to: ['50', '%', 'of', 'the'] },
  { from: ['a', 'handful', 'of'], to: ['handful'] },
  { from: ['a', 'hundred'], to: ['100'] },
  { from: ['a', 'large', 'majority', 'of'], to: ['above', '60', '%', 'of'] },
  { from: ['a', 'long', 'time', 'ago'], to: ['over', '100', 'years', 'ago'] },
  { from: ['a', 'majority', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['a', 'number', 'of'], to: ['number'] },
  { from: ['a', 'quarter', 'of', 'a', 'million'], to: ['25e4'] },
  { from: ['a', 'quarter'], to: ['one', 'quarter'] },
  { from: ['a', 'third'], to: ['one', 'third'] },
  { from: ['a', 'thousand'], to: ['1000'] },
  { from: ['a', 'total', 'of'], to: [] },
  { from: ['a', 'vast', 'majority', 'of'], to: ['above', '60', '%', 'of'] },
  { from: ['although'], to: ['but'] },
  { from: ['american', 'dollars'], to: ['USDs'] },
  { from: ['an', 'estimated'], to: ['around'] },
  { from: ['an', 'overwhelming', 'majority', 'of'], to: ['above', '75', '%', 'of'] },
  { from: ['and', 'are'], to: ['and', 'they', 'are'] },
  { from: ['and', 'had'], to: ['and', 'it', 'had'] },
  { from: ['and', 'has'], to: ['and', 'it', 'has'] },
  { from: ['and', 'is'], to: ['and', 'it', 'is'] },
  { from: ['and', 'was'], to: ['and', 'it', 'was'] },
  { from: ['and', 'were'], to: ['and', 'they', 'were'] },
  { from: ['annually'], to: ['every', '1', 'years'] },
  { from: ['appear', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['appears', 'to', 'have'], to: ['likely', 'has'] },
  { from: ['approximately', 'in'], to: ['in', 'approximately'] },
  { from: ['are', 'anticipated', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'believed', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'considered', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'inferred', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'judged', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'perceived', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'regarded', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['are', 'thought', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['as', 'early', 'as', 'the'], to: ['in', 'the'] },
  { from: ['as', 'late', 'as', 'the'], to: ['in', 'the'] },
  { from: ['as', 'many', 'as'], to: [] },
  { from: ['as', 'much', 'as'], to: [] },
  { from: ['as', 'of'], to: ['in'] },
  { from: ['as', 'recently', 'as'], to: [] },
  { from: ['at', 'least'], to: ['above'] },
  { from: ['at', 'the', 'same', 'time', 'at', 'the', 'same', 'time'], to: ['at', 'the', 'same', 'time', ','] },
  { from: ['at', 'the', 'same', 'time'], to: ['at', 'the', 'same', 'time', ','] },
  { from: ['at', 'times'], to: ['occasionally'] },
  { from: ['b.c.e'], to: ['BCE'] },
  { from: ['bc'], to: ['BCE'] },
  { from: ['because', 'of'], to: [',', 'due', 'to'] },
  { from: ['beginning', 'on'], to: ['since'] },
  { from: ['biannually'], to: ['every', '6', 'months'] },
  { from: ['billions', 'of'], to: ['above', 'one', 'billion'] },
  { from: ['but'], to: [',', 'but'] },
  { from: ['by', 'the', 'start', 'of'], to: ['#by-the-start-of'] },
  { from: ['c.'], to: ['around'] },
  { from: ['century', 'ce'], to: ['century'] },
  { from: ['colloquially', 'known', 'as'], to: ['known', 'as'] },
  { from: ['commencing', 'on'], to: ['since'] },
  { from: ['commonly', 'known', 'as'], to: ['known', 'as'] },
  { from: ['currently', 'known', 'as'], to: ['known', 'as'] },
  { from: ['date', 'back', 'to'], to: ['started', 'in'] },
  { from: ['dates', 'back', 'to'], to: ['started', 'in'] },
  { from: ['dozens', 'of', 'billions', 'of'], to: ['above', '1e10'] },
  { from: ['dozens', 'of', 'millions', 'of'], to: ['above', '1e7'] },
  { from: ['dozens', 'of', 'thousands', 'of'], to: ['above', '1e4'] },
  { from: ['dozens', 'of', 'trillions', 'of'], to: ['above', '1e13'] },
  { from: ['dozens', 'of'], to: ['above', '10'] },
  { from: ['early', 'to', 'mid'], to: ['early-to-mid'] },
  { from: ['eastern'], to: ['Eastern'] },
  { from: ['estimated', 'at'], to: [] },
  { from: ['estimated', 'to', 'be'], to: [] },
  { from: ['estimated', 'to', 'have', 'been'], to: [] },
  { from: ['et', 'al.'], to: [',', 'and', 'others'] },
  { from: ['even', 'as', 'early', 'as', 'the'], to: ['in', 'the'] },
  { from: ['even', 'as', 'late', 'as', 'the'], to: ['in', 'the'] },
  { from: ['eventually', 'resulting', 'in'], to: ['resulting', 'in'] },
  { from: ['every', 'once', 'in', 'a', 'while'], to: ['occasionally'] },
  { from: ['every', 'other', 'day'], to: ['every', '2', 'days'] },
  { from: ['every', 'other', 'hour'], to: ['every', '2', 'hours'] },
  { from: ['every', 'other', 'month'], to: ['every', '2', 'months'] },
  { from: ['every', 'other', 'week'], to: ['every', '2', 'weeks'] },
  { from: ['every', 'other', 'year'], to: ['every', '2', 'years'] },
  { from: ['excluding', ':'], to: ['excluding'] },
  { from: ['formerly', 'known', 'as'], to: ['known', 'as'] },
  { from: ['from', 'time', 'to', 'time'], to: ['occasionally'] },
  { from: ['had', 'been'], to: ['were'] },
  { from: ['half', 'of', 'the'], to: ['50', '%', 'of', 'the'] },
  { from: ['half', 'the'], to: ['50', '%', 'of', 'the'] },
  { from: ['has', 'been'], to: ['is'] },
  { from: ['has', 'often', 'been'], to: ['frequently', 'is'] },
  { from: ['have', 'been'], to: ['are'] },
  { from: ['historically', 'known', 'as'], to: ['known', 'as'] },
  { from: ['hundreds', 'of', 'billions', 'of'], to: ['above', '1e11'] },
  { from: ['hundreds', 'of', 'millions', 'of'], to: ['above', '1e8'] },
  { from: ['hundreds', 'of', 'thousands', 'of'], to: ['above', '1e5'] },
  { from: ['hundreds', 'of', 'trillions', 'of'], to: ['above', '1e14'] },
  { from: ['hundreds', 'of'], to: ['above', '100'] },
  { from: ['in', 'addition'], to: [] },
  { from: ['in', 'every'], to: ['every'] },
  { from: ['in', 'fact', ','], to: [] },
  { from: ['in', 'reality'], to: [] },
  { from: ['in', 'total', ',', 'there', 'are'], to: ['there', 'are'] },
  { from: ['in', 'total', 'there', 'are'], to: ['there', 'are'] },
  { from: ['including', ':'], to: ['including'] },
  { from: ['is', 'believed', 'to', 'be'], to: ['likely', 'is'] },
  { from: ['is', 'known', 'to', 'have', 'been'], to: ['was'] },
  { from: ['is', 'known', 'to', 'have'], to: ['have'] },
  { from: ['it', 'is', 'believed', 'that'], to: ['likely'] },
  { from: ['it', 'is', 'speculated', 'that'], to: ['likely'] },
  { from: ['just', 'above'], to: ['above'] },
  { from: ['little', 'more', 'than'], to: ['above'] },
  { from: ['majority', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['many', 'billions', 'of'], to: ['above', 'one', 'billion'] },
  { from: ['many', 'dozens', 'of'], to: ['above', '10'] },
  { from: ['many', 'hundreds', 'of', 'millions', 'of'], to: ['above', '1e8'] },
  { from: ['many', 'hundreds', 'of', 'thousands', 'of'], to: ['above', '1e5'] },
  { from: ['many', 'millions', 'of'], to: ['above', 'one', 'million'] },
  { from: ['many', 'thousands', 'of'], to: ['above', '1000'] },
  { from: ['many', 'trillions', 'of'], to: ['above', 'one', 'trillion'] },
  { from: ['meanwhile', ','], to: [] },
  { from: ['mid', 'to', 'late'], to: ['mid-to-late'] },
  { from: ['million', 'years', 'ago', '(', 'mya', ')'], to: ['million', 'years', 'ago'] },
  { from: ['millions', 'of'], to: ['above', 'one', 'million'] },
  { from: ['more', 'recently'], to: ['in', `${now.getFullYear() - 5}–${now.getFullYear()}`] },
  { from: ['more', 'than'], to: ['above'] },
  { from: ['most', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['much', 'of'], to: ['above', '20', '%', 'of'] },
  { from: ['no', 'more', 'than'], to: ['almost'] },
  { from: ['northern'], to: ['Northern'] },
  { from: ['not', 'a', 'long', 'time', 'ago'], to: ['below', '100', 'years', 'ago'] },
  { from: ['not', 'excluding'], to: ['including'] },
  { from: ['not', 'including'], to: ['excluding'] },
  { from: ['now'], to: convertNow(now) },
  { from: ['nowadays'], to: convertNow(now) },
  { from: ['officially', 'known', 'as'], to: ['known', 'as'] },
  { from: ['often', ',', 'but', 'not', 'always', ','], to: ['usually'] },
  { from: ['on', 'average'], to: ['typically'] },
  { from: ['on', 'that', 'date', ','], to: ['at', 'the', 'same', 'time', ','] },
  { from: ['on', 'the', 'night', 'of'], to: ['on'] },
  { from: ['on', 'the', 'other', 'hand', ','], to: [] },
  { from: ['on', 'the', 'other', 'hand'], to: [] },
  { from: ['once', 'in', 'a', 'while'], to: ['occasionally'] },
  { from: ['once'], to: ['1', 'times'] },
  { from: ['one', 'half', 'of', 'the'], to: ['50', '%', 'of', 'the'] },
  { from: ['one', 'half', 'the'], to: ['50', '%', 'of', 'the'] },
  { from: ['one-third'], to: ['one', 'third'] },
  { from: ['originally', 'known', 'as'], to: ['known', 'as'] },
  { from: ['out', 'of', 'a', 'population', 'of'], to: ['out', 'of'] },
  { from: ['over', 'the', 'course', 'of', 'many', 'centuries'], to: ['above', '300', 'years', 'ago'] },
  { from: ['over', 'the', 'course', 'of', 'many', 'generations'], to: ['above', '100', 'years', 'ago'] },
  { from: ['over', 'the', 'course', 'of', 'many', 'years'], to: ['above', '5', 'years', 'ago'] },
  { from: ['over', 'the', 'last', 'couple', 'of'], to: ['over', 'the', 'last', 'several'] },
  { from: ['over', 'the', 'last', 'decade'], to: ['over', 'the', 'last', '10', 'years'] },
  { from: ['over', 'the', 'last', 'few'], to: ['over', 'the', 'last', 'several'] },
  { from: ['over', 'the', 'last', 'half', 'a', 'century'], to: ['over', 'the', 'last', '50', 'years'] },
  { from: ['perhaps'], to: ['likely'] },
  { from: ['popularly', 'known', 'as'], to: ['known', 'as'] },
  { from: ['pretend', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['pretends', 'to', 'have'], to: ['likely', 'has'] },
  { from: ['previously', 'known', 'as'], to: ['known', 'as'] },
  { from: ['quite', 'a', 'long', 'time', 'ago'], to: ['over', '200', 'years', 'ago'] },
  { from: ['recent', 'decades'], to: [`${now.getFullYear() - 40}–${now.getFullYear()}`] },
  { from: ['recent', 'years'], to: [`${now.getFullYear() - 15}–${now.getFullYear()}`] },
  { from: ['seem', 'to', 'have'], to: ['likely', 'have'] },
  { from: ['seems', 'to', 'have'], to: ['likely', 'has'] },
  { from: ['several', 'hundred'], to: ['101–1000'] },
  { from: ['simply', 'known', 'as'], to: ['known', 'as'] },
  { from: ['so', 'many'], to: ['many'] },
  { from: ['sometimes', 'known', 'as'], to: ['known', 'as'] },
  { from: ['southern'], to: ['Southern'] },
  { from: ['starting', 'from'], to: ['since'] },
  { from: ['starting'], to: ['since'] },
  { from: ['strictly', 'speaking'], to: [] },
  { from: ['such', 'as'], to: [':'] },
  { from: ['the', 'city', 'of'], to: [] },
  { from: ['the', 'following', 'year'], to: ['1', 'years', 'later'] },
  { from: ['the', 'handful', 'of'], to: ['handful'] },
  { from: ['the', 'large', 'majority', 'of'], to: ['above', '60', '%', 'of'] },
  { from: ['the', 'majority', 'of'], to: ['above', '50', '%', 'of'] },
  { from: ['the', 'next', 'year'], to: ['1', 'years', 'later'] },
  { from: ['the', 'number', 'of'], to: ['the', 'amount', 'of'] },
  { from: ['the', 'overwhelming', 'majority', 'of'], to: ['above', '75', '%', 'of'] },
  { from: ['the', 'preceding', 'year'], to: ['1', 'years', 'earlier'] },
  { from: ['the', 'previous', 'year'], to: ['1', 'years', 'earlier'] },
  { from: ['the', 'second', 'half', 'of', 'the'], to: ['the', 'late'] },
  { from: ['the', 'vast', 'majority', 'of'], to: ['above', '60', '%', 'of'] },
  { from: ['then', 'the', 'following', 'year'], to: ['1', 'years', 'later'] },
  { from: ['then', 'the', 'next', 'year'], to: ['1', 'years', 'later'] },
  { from: ['though'], to: ['but'] },
  { from: ['thousands', 'of'], to: ['above', '1000'] },
  { from: ['thrice', 'a', 'year'], to: ['every', '4', 'months'] },
  { from: ['thrice'], to: ['3', 'times'] },
  { from: ['thus', 'resulting', 'in'], to: ['resulting', 'in'] },
  { from: ['today'], to: convertNow(now) },
  { from: ['triannually'], to: ['every', '4', 'months'] },
  { from: ['trillions', 'of'], to: ['above', 'one', 'trillion'] },
  { from: ['twice', 'a', 'year'], to: ['every', '6', 'months'] },
  { from: ['twice'], to: ['2', 'times'] },
  { from: ['two-thirds'], to: ['two', 'thirds'] },
  { from: ['u.s.', 'dollars'], to: ['USDs'] },
  { from: ['ultimately', 'resulting', 'in'], to: ['resulting', 'in'] },
  { from: ['united', 'states', 'dollars'], to: ['USDs'] },
  { from: ['until'], to: ['by'] },
  { from: ['up', 'to'], to: ['below'] },
  { from: ['us', 'dollars'], to: ['USDs'] },
  { from: ['well', 'over'], to: ['above'] },
  { from: ['western'], to: ['Western'] },
  { from: ['which'], to: [',', 'which'] },
  { from: ['whole', 'hundreds', 'of'], to: ['above', '100'] },
];

const convertSynonyms = ({ now, createMap = createDefaultMap } = {}) => (phrase) => {
  const maps = _.sortBy(
    Object.entries(
      _.groupBy(createMap({ now }), x => x.from.length),
    ),
    ([key]) => -Number(key),
  )
    .map(([, value]) => value);

  const converters = maps.map(map => currentPhrase => currentPhrase.reduce((accumulator, current) => {
    const found = map.find(e => JSON.stringify(
      getLast(
        [...accumulator, current].map(toLowerCase),
        e.from.length,
      ),
    ) === JSON.stringify(e.from));
    if (found) {
      return [
        ...withoutLast(accumulator, found.from.length - 1),
        ...found.to,
      ];
    }

    return [
      ...accumulator,
      current,
    ];
  },
  []));

  return _.flow(converters)(phrase);
};

module.exports = convertSynonyms;
