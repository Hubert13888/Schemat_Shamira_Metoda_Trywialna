import React, { useState } from "react";
import "./styles.css";

function randomInt(min, max) {
  return min + Math.floor((max - min) * Math.random());
}
function czy_pierwsza(n) {
  if (n < 2) return false;

  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}
function generatePolynomial(x, a, t) {
  let sum = 0;
  for (let i = 0; i < t - 1; i++) {
    sum += a[i] * Math.pow(x, i + 1);
  }
  return sum;
}
function mod(k, n) {
  if ((k %= n) < 0) {
    if (k < -1) {
      console.log(Math.abs(k) % n);
      return Math.abs(k) % n;
    } else return k + n;
  } else return k % n;
}
function modInverse(a, m) {
  a = a % m;
  for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
}

export default function App() {
  let [u, setU] = useState("");
  let [sekret, setSekret] = useState("");
  let [uS, setUS] = useState("");
  let [pS, setPS] = useState("");
  let [sekretS, setSekretS] = useState("");

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          let d = [];
          for (let data of formData) {
            d.push(data[1]);
          }

          let n = Number(d[0]),
            k = Number(d[1]),
            s = Number(d[2]);

          let randValues = [],
            udzialyStr = "";

          for (let i = 0; i < n - 1; i++) {
            randValues.push(randomInt(0, k - 1));
          }
          for (let val of randValues) {
            udzialyStr += val + "/";
            s -= val;
          }
          udzialyStr += s % k;
          setU(udzialyStr);
        }}
      >
        <h1>Metoda trywialna dzielenia sekretu</h1>
        <input type="text" name="n" placeholder="n" />
        <input type="text" name="k" placeholder="k" />
        <input type="text" name="s" placeholder="s" />
        <button>Oblicz udziały</button>
      </form>
      <div className="results">
        <p>Udzialy:</p>
        <p>{u}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          let d = [];
          for (let data of formData) {
            d.push(data[1]);
          }

          let udz = d[0].split("/"),
            k = Number(d[1]),
            s = 0;

          for (let ud of udz) {
            s += Number(ud);
          }
          setSekret(s % k);
        }}
      >
        <input type="text" name="udzialy" placeholder="udziały" />
        <input type="text" name="k" placeholder="k" />
        <button>Oblicz sekret</button>
      </form>
      <div className="results">
        <p>Sekret:</p>
        <p>{sekret}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          let d = [];
          for (let data of formData) {
            d.push(data[1]);
          }

          let n = Number(d[0]),
            t = Number(d[1]),
            a0 = Number(d[2]),
            s = Number(d[3]);

          let aNums = [],
            p,
            udz = [],
            udzStr = "";
          while (true) {
            p = randomInt(s > n ? s : n, s > n ? n : s);
            if (czy_pierwsza(p)) break;
          }
          setPS(p);
          for (let i = 0; i < t - 1; i++) {
            aNums.push(randomInt(1, n * 5));
          }
          for (let i = 0; i < n; i++) {
            udz.push((s + generatePolynomial(i + 1, aNums, t)) % p);
            udzStr += i + 1 + "," + udz[i] + "/";
          }
          setUS(udzStr);
        }}
      >
        <h1>Schemat Shamira</h1>
        <input type="text" name="n" placeholder="n" />
        <input type="text" name="k" placeholder="t" />
        <input type="text" name="a0" placeholder="a0" />
        <input type="text" name="s" placeholder="s" />
        <button>Oblicz udziały</button>
      </form>
      <div className="results">
        <p>Udzialy:</p>
        <p>{uS}</p>

        <p>p:</p>
        <p>{pS}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          let formData = new FormData(e.target);
          let d = [];
          for (let data of formData) {
            d.push(data[1]);
          }

          let udz = d[0],
            p = Number(d[1]),
            t = d[2];
          udz = udz.split("/");
          let udz1 = [];
          for (let i = 0; i < udz.length; i++) {
            let u = udz[i].split(",");
            if (u[1]) udz1.push(Number(u[1]));
          }
          console.log(udz1);
          let accum = 0;
          for (let i = 0; i < t; i++) {
            let num = 1,
              den = 1;
            for (let j = 0; j < t; j++) {
              den = 1;
              if (i !== j) {
                num = mod(num * (-j - 1), p);
                den = den * mod(i - j, p);
              }
            }
            let value = udz1[i];
            let tmp = (value * num * modInverse(den, p)) % p;
            accum = (accum + p + tmp) % p;
            console.log(tmp, p, num);
          }
          setSekretS(accum);
        }}
      >
        <input type="text" name="udzialy" placeholder="udziały" />
        <input type="text" name="p" placeholder="p" />
        <input type="text" name="t" placeholder="t" />
        <button>Oblicz sekret</button>
      </form>
      <div className="results">
        <p>Sekret:</p>
        <p>{sekretS}</p>
      </div>
    </div>
  );
}
