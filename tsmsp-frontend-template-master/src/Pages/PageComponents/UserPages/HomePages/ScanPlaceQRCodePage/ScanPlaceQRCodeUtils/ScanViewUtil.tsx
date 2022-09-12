import React from "react";
import { SendData } from "Utils/SendDataUtil";
import { UserUpdateTraceMessage } from "Messages/UserMessages/UserUpdateTraceMessage";
import { ScanView } from "Utils/PageUtils/ScanQRCodeUtil";
import { DetailedPlaceDescription } from "Types/PlaceMeta/DetailedPlaceDescription";
import { ReportType } from "Types/TraceMeta/ReportType";
import { PlaceId } from "Types/PlaceMeta/PlaceId";

export function PlaceScanView(props: any) {
  return (
    <ScanView
      handleData={(data: string) => {
        const placeId = JSON.parse(data) as PlaceId;
        SendData(
          new UserUpdateTraceMessage(
            props.token,
            placeId,
            new DetailedPlaceDescription(""),
            ReportType.auto
          ),
          (_: any) => alert("上传成功")
        );
      }}
    />
  );
}
