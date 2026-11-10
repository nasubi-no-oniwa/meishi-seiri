// 地位を失った人の数（zc：全期間、zt：今日）を、いまの zen の記録から数えなおして書く（GitHub の上でだけ動く）
import { token, api } from './fb.mjs';
const tk = await token();
const zen = JSON.parse(await api('GET', '/meishi/zen.json', undefined, tk)) || {};
const today = Math.floor((Date.now() + 32400000) / 86400000), d0 = today * 86400000 - 32400000;
const ids = Object.keys(zen);
const n = ids.filter(k => zen[k] && zen[k].t >= d0).length;
console.log('全期間', ids.length, '人 / 今日', n, '人');
await api('PUT', '/meishi/zc.json', JSON.stringify(ids.length), tk);
await api('PUT', '/meishi/zt.json', JSON.stringify({ dk: today, n }), tk);
console.log('書きました');
