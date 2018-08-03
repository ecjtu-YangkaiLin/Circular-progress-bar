# Circular-progress-bar
A simple circular progress bar

ProgressBar.init(Values, duration, interval, format, fontSize)

## Use example
1.  include file <script src="progress.js"></script>
2.  let p = new ProgressBar('ProgressBar');
3.  p.init(100, 2000, 16, "Percentage\n%s%", "10px"); //*%s* will be replaced with the current percentage, the first parameter is the target percentage

If you want to update the existing progress, execute *init* again.

![image](https://github.com/tkkeni/Circular-progress-bar/raw/master/example.png)
