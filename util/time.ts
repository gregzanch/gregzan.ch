export class Time extends Date {
  constructor(args: string | number | Date) {
    super(args);
  }
  get delta() {
    return +new Date() - +this;
  }
  format() {
    const ranges = [
      { label: "Milli-Second", base: 1000 },
      { label: "Second", base: 60 },
      { label: "Minute", base: 60 },
      { label: "Hour", base: 24 },
      { label: "Day", base: 7 },
      { label: "Week", base: 4.4 },
      { label: "Month", base: 12 },
      { label: "Year", base: 100 },
    ];
    let t = this.delta;
    let label = "";
    for (let i = 0; i < ranges.length - 1; i++) {
      if (!(t / ranges[i].base < ranges[i + 1].base)) {
        t /= ranges[i].base; //?
      } else {
        t /= ranges[i].base;
        label = ranges[i + 1].label;
        break;
      }
    }

    const time = Math.trunc(t);
    label = time >= 2 ? label + "s" : label;
    return `${time} ${label} Ago`;
  }
}

export default Time;

new Time("2021-01-24T23:16:31Z").format(); //?
new Time("2021-01-22T06:25:11Z").format(); //?
new Time("2021-01-13T05:11:22Z").format(); //?
new Time("2020-12-28T22:38:15Z").format(); //?
new Time("2020-12-13T01:05:26Z").format(); //?
new Time("2020-12-12T16:07:11Z").format(); //?
new Time("2020-12-04T08:51:17Z").format(); //?
new Time("2020-11-10T17:21:32Z").format(); //?
new Time("2020-10-31T07:29:11Z").format(); //?
new Time("2020-06-01T16:23:11Z").format(); //?
new Time("2020-04-27T00:23:44Z").format(); //?
new Time("2020-04-19T00:58:35Z").format(); //?
new Time("2019-11-20T02:11:46Z").format(); //?
new Time("2019-11-18T01:59:01Z").format(); //?
new Time("2019-11-13T20:26:23Z").format(); //?
new Time("2019-04-17T08:52:56Z").format(); //?
new Time("2018-08-03T06:40:09Z").format(); //?
