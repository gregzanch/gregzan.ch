import React, { useEffect, useMemo } from "react";
import { makeNoise } from "util/perlin";

interface LinearGradientProps extends React.SVGProps<SVGLinearGradientElement> {
  stops: StopProps[];
}

interface StopProps {
  offset: number | string;
  color: string;
  opacity: number;
}

function LinearGradient(props: LinearGradientProps) {
  const { id, x1, y1, x2, y2 } = props;
  return (
    <linearGradient
      id={id}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      gradientTransform={props.gradientTransform}
    >
      {props.stops.map((s, i) => (
        <stop
          key={id + String(i)}
          offset={s.offset}
          stopColor={s.color}
          stopOpacity={s.opacity}
        />
      ))}
    </linearGradient>
  );
}

const { random, abs, cos, sin, PI: pi } = Math;

type Vec2 = {
  x: number;
  y: number;
};

const iter = function* (a: Vec2) {
  yield a.x;
  yield a.y;
};

const vec2 = (x: number, y: number) => ({ x, y } as Vec2);

const sub = (a: Vec2, b: Vec2) => vec2(a.x - b.x, a.y - b.y);
const add = (a: Vec2, b: Vec2) => vec2(a.x + b.x, a.y + b.y);
const scale = (a: Vec2, s: number) => vec2(a.x * s, a.y * s);

const getPointAlongCircle = (progress = 0, radius = 1, phase = 0) =>
  ({
    x: radius * +cos(2 * pi * progress + phase),
    y: radius * +sin(2 * pi * progress + phase),
  } as Vec2);

const getTangentAlongCircle = (progress = 0, radius = 1, phase = 0) =>
  ({
    x: radius * -sin(2 * pi * progress + phase),
    y: radius * +cos(2 * pi * progress + phase),
  } as Vec2);

function splitEvery<T>(arr: T[], n: number): T[][] {
  return arr.reduce(
    (a, b) => {
      if (a[a.length - 1].length < n) {
        a[a.length - 1].push(b);
      } else {
        a.push([b]);
      }
      return a;
    },
    [[]] as T[][]
  );
}

type createBlobPathProps = {
  size: number;
  count: number;
  amplitude: number;
  random: () => number;
};

const createBlobPath = ({
  size,
  count,
  amplitude,
  random,
}: createBlobPathProps) => {
  const radius = size / 2;
  const step = 1 / count;
  const ystep = getPointAlongCircle(step, radius).y;
  const tangentScaleFactor = abs(ystep) / (3 * radius);

  const points = [] as Vec2[];
  for (let i = 0; i < count; i++) {
    const progress = i * step;
    const rand = 1 - amplitude + random() * amplitude;
    const point = getPointAlongCircle(progress, rand * radius);
    const tangent = getTangentAlongCircle(progress, rand * radius);
    const scaledTangent = scale(tangent, tangentScaleFactor);
    const controlPoint1 = sub(point, scaledTangent);
    const controlPoint2 = add(point, scaledTangent);

    points.push(controlPoint1, point, controlPoint2);
  }

  points.push(points.shift()!);
  points.push(points.shift()!);
  const Ccommands = splitEvery(points, 3).map((x) => [
    "C",
    ...iter(x[0]),
    ...iter(x[1]),
    ...iter(x[2]),
  ]);

  const commands = [
    ["M", ...iter(points[points.length - 1])],
    ...Ccommands,
    ["Z"],
  ];

  const d = commands.map((x) => x.join(" ")).join(" ");
  return d;
};

let x = 0;
let y = 1;

const noise = makeNoise({
  length: 4096,
  octaves: 4,
  falloff: 0.5,
});

export function SVGBlob({ size = 200, count = 10, amplitude = 1 }) {
  const d = useMemo(
    () =>
      createBlobPath({
        size,
        count,
        amplitude,
        random: () => {
          let n = noise(x++);
          return n;
        },
      }),
    [size, count, amplitude, createBlobPath]
  );
  useEffect(() => {});
  return (
    <svg
      width={size}
      height={size}
      viewBox={[-size / 2, -size / 2, size, size].join(" ")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <LinearGradient
          id="lgrad1"
          x1={"0%"}
          y1={"100%"}
          x2={"25%"}
          y2={"0%"}
          gradientTransform={"rotate(0 0 0)"}
          stops={[
            {
              color: "#f12711",
              offset: "0%",
              opacity: 1,
            },
            {
              color: "#f5af19",
              offset: "100%",
              opacity: 1,
            },
          ]}
        />
      </defs>
      <path d={d} fill="url(#lgrad1)" />
    </svg>
  );
}

export default SVGBlob;
