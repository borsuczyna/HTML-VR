export enum OS {
    Windows = "Windows",
    Linux = "Linux",
    MacOS = "MacOS",
    Android = "Android",
    iOS = "iOS",
    Unknown = "Unknown"
}

export enum Device {
    Desktop = "Desktop",
    Mobile = "Mobile",
    Unknown = "Unknown"
}

export class DeviceManager {
    OS: OS = OS.Unknown;
    device: Device = Device.Unknown;

    constructor() {
        this.OS = this.getOS();
        this.device = this.getDevice();
    }

    private getOS(): OS {
        if (navigator.userAgent.indexOf("Win") != -1) {
            return OS.Windows;
        } else if (navigator.userAgent.indexOf("Mac") != -1) {
            return OS.MacOS;
        } else if (navigator.userAgent.indexOf("Linux") != -1) {
            return OS.Linux;
        } else if (navigator.userAgent.indexOf("Android") != -1) {
            return OS.Android;
        } else if (navigator.userAgent.indexOf("like Mac") != -1) {
            return OS.iOS;
        } else {
            return OS.Unknown;
        }
    }

    private getDevice(): Device {
        if (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("Tablet") != -1) {
            return Device.Mobile;
        } else {
            return Device.Desktop;
        }
    }
}