/**
 * codebg.js — Floating code symbols background
 * Generates ambient code snippets, errors, and tech symbols.
 */
(() => {
  "use strict";

  const container = document.getElementById("codeBg");
  if (!container) return;

  const snippets = [
    // C++
    { text: "#include <iostream>",          cls: "" },
    { text: "#include <vector>",            cls: "" },
    { text: "int main() {",                cls: "" },
    { text: "std::cout << output;",        cls: "" },
    { text: "auto& ref = obj;",            cls: "" },
    { text: "template<typename T>",         cls: "purple" },
    { text: "nullptr",                      cls: "purple" },
    { text: "std::vector<int> v;",         cls: "" },
    { text: "return 0;",                    cls: "green" },
    { text: "::",                           cls: "purple" },
    { text: "virtual void render();",       cls: "" },
    { text: "delete[] ptr;",               cls: "err" },
    // Python
    { text: "import numpy as np",           cls: "" },
    { text: "import pandas as pd",          cls: "" },
    { text: "def __init__(self):",          cls: "purple" },
    { text: "if __name__ == '__main__':",  cls: "" },
    { text: "print(f'{value}')",           cls: "green" },
    { text: "lambda x: x * 2",             cls: "purple" },
    { text: "for i in range(n):",           cls: "" },
    { text: "import tensorflow as tf",      cls: "purple" },
    { text: "@staticmethod",                cls: "purple" },
    { text: "class Model(nn.Module):",      cls: "" },
    { text: "yield from generator",         cls: "purple" },
    { text: "with open(file) as f:",        cls: "" },
    // Laravel / PHP
    { text: "<?php",                         cls: "purple" },
    { text: "use Illuminate\\Http;",        cls: "" },
    { text: "Route::get('/api', fn()=>",   cls: "" },
    { text: "$user->save();",               cls: "green" },
    { text: "->where('id', $id)",           cls: "" },
    { text: "DB::table('users')",           cls: "" },
    { text: "response()->json([])",         cls: "green" },
    { text: "middleware('auth:api')",        cls: "purple" },
    { text: "artisan make:model User",      cls: "" },
    // Flutter / Dart
    { text: "import 'package:flutter'",     cls: "" },
    { text: "Widget build(context) {",      cls: "" },
    { text: "StatefulWidget",               cls: "purple" },
    { text: "StreamBuilder<T>",             cls: "purple" },
    { text: "await Future.delayed()",       cls: "" },
    { text: "setState(() { });",            cls: "green" },
    { text: "Navigator.push(context,",      cls: "" },
    { text: "BlocProvider<AuthBloc>",       cls: "purple" },
    { text: "final List<String> data = []", cls: "" },
    // SQL / MongoDB
    { text: "SELECT * FROM users",          cls: "" },
    { text: "JOIN orders ON u.id=o.id",     cls: "" },
    { text: "WHERE status = 'active'",      cls: "green" },
    { text: "db.collection.aggregate([])",  cls: "" },
    { text: "$match: { role: 'admin' }",    cls: "purple" },
    { text: "CREATE INDEX idx_email",       cls: "" },
    // Git / Terminal
    { text: "git commit -m 'feat: ...'",    cls: "green" },
    { text: "git push origin main",         cls: "green" },
    { text: "npm run dev",                  cls: "" },
    { text: "docker-compose up -d",         cls: "" },
    { text: "ssh user@192.168.1.1",         cls: "purple" },
    { text: "chmod 755 deploy.sh",          cls: "" },
    // Java / OOP
    { text: "public class Main {",          cls: "" },
    { text: "@Override",                     cls: "purple" },
    { text: "implements Serializable",       cls: "purple" },
    { text: "ArrayList<String> list",        cls: "" },
    { text: "throws NullPointerException",   cls: "err" },
    { text: "synchronized(this) {",          cls: "" },
    // Errors
    { text: "Error: undefined is not fn",   cls: "err" },
    { text: "NullPointerException",          cls: "err" },
    { text: "Segmentation Fault (core)",     cls: "err" },
    { text: "Stack overflow at line 42",     cls: "err" },
    { text: "404 Not Found",                cls: "err" },
    { text: "FATAL: Connection refused",     cls: "err" },
    { text: "Warning: deprecated API",       cls: "err" },
    { text: "// TODO: fix this later",      cls: "err" },
    { text: "/* HACK: remove in prod */",    cls: "err" },
    // Symbols / misc
    { text: "{ }",                           cls: "purple" },
    { text: "=> | && | ||",                 cls: "purple" },
    { text: "0x1F  0x00  0xFF",             cls: "green" },
    { text: "O(n log n)",                    cls: "green" },
    { text: "binary: 01001000 01101001",     cls: "green" },
    { text: "hex: 0xDEADBEEF",             cls: "green" },
    { text: "IPv4: 192.168.0.1",            cls: "green" },
    { text: "SHA256: a3f9c2...",            cls: "purple" },
    { text: "JWT eyJhbGci...",              cls: "purple" },
    { text: "200 OK | 201 Created",         cls: "green" },
    { text: "500 Internal Server Error",    cls: "err" },
  ];

  const COUNT   = 40;
  const MIN_DUR = 22;
  const MAX_DUR = 52;

  const rand = (a, b) => Math.random() * (b - a) + a;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 18 : COUNT;

  for (let i = 0; i < count; i++) {
    const snip = pick(snippets);
    const el   = document.createElement("div");

    el.className = "cb" + (snip.cls ? " " + snip.cls : "");
    el.textContent = snip.text;

    el.style.left = rand(0, 93) + "vw";
    el.style.top  = rand(2, 97) + "vh";
    el.style.setProperty("--dur", rand(MIN_DUR, MAX_DUR).toFixed(1) + "s");
    /* negative delay so animations are already mid-flight on load */
    el.style.setProperty("--del", "-" + rand(0, MAX_DUR).toFixed(1) + "s");
    el.style.setProperty("--dx",  (rand(-22, 22)).toFixed(1) + "px");
    el.style.transform =
      "scale(" + rand(0.78, 1.22).toFixed(2) + ") rotate(" + rand(-5, 5).toFixed(1) + "deg)";

    container.appendChild(el);
  }

  /* Re-randomize position + content each cycle */
  container.querySelectorAll(".cb").forEach(el => {
    el.addEventListener("animationiteration", () => {
      const snip = pick(snippets);
      el.textContent = snip.text;
      el.className = "cb" + (snip.cls ? " " + snip.cls : "");
      el.style.left = rand(0, 93) + "vw";
      el.style.top  = rand(2, 97) + "vh";
    });
  });
})();
