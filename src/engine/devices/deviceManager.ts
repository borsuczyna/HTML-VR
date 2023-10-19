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
    static get os(): OS {
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

    static get device(): Device {
        if (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("Tablet") != -1) {
            return Device.Mobile;
        } else {
            return Device.Desktop;
        }
    }
}