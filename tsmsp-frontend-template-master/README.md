## TSMSP前端模板说明

### 前置要求
- 安装[Node.js](https://nodejs.org/zh-cn/)(不低于16)，通过输入`npm --version`来验证npm可以正常使用
- 在本文件夹中使用`npm install`，这可能会花费很长一段时间。如果因为不科学上网的原因导致网速过慢，可以使用`npx nrm use taobao`命令切换到国内的淘宝源
- 准备一台安卓手机/虚拟机进行测试。我们推荐按照这个教程安装并使用[Android Studio的模拟机](https://docs.expo.dev/workflow/android-studio-emulator/)进行后续的开发测试。需要注意的是，如果你准备使用虚拟机进行测试，那么请保证虚拟机的*存储大小*不少于*4G*

### 运行方法
输入`npm start`或者`expo start`，之后在选择运行平台的时候按下`a`即可。如果你已经完成了安卓测试机的准备，前端会在测试机上自动开始运行。