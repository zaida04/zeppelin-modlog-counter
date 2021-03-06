# Zeppelin Mod Log Counter
Get an easy and readable counter of all action types your moderators have taken from your `cases.csv` file.
![Example Image](example-1.png)

## 📝 How to use
```
git clone https://github.com/zaida04/zeppelin-modlog-counter zmc
cd zmc
npm i
npm run build
```
After you've completed the above steps, create a `.env` file at the root of your project and provide a `DISCORD_TOKEN` variable. This is only used to fetch Discord users from the API.

And finally, drop your `cases.csv` in the root of your project and run `npm start`. If your `cases.csv` is named something else, provide a `CASES_FILE_PATH` variable in your `.env` file.

## 🚧 LICENSE
This license can also be found [here](https://github.com/zaida04/zeppelin-modlog-counter/blob/main/LICENSE)
```
MIT License

Copyright (c) 2021 Zaid (Nico)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```