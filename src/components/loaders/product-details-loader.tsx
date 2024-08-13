import React from "react"
import ContentLoader from "react-content-loader"

const AmazonLoader = (props: any) => {
  return (
    <ContentLoader
      rtl
      viewBox="0 0 1280 960"
      height={960}
      width={1280}
      {...props}
    >
      <rect height="613" width="434" x="422.5" y="91.5" />
      <rect height="56" width="160" x="1082" y="94" />
      <rect height="59" width="166" x="894" y="92" />
      <rect height="66" width="349" x="893" y="162" />
      <rect height="22" width="334" x="52" y="91.5" />
      <rect height="22" width="334" x="52" y="126" />
      <rect height="22" width="334" x="52" y="158.75" />
      <rect height="22" width="334" x="52" y="193.25" />
      <rect height="22" width="334" x="52" y="229.13" />
      <rect height="22" width="334" x="52" y="263.63" />
      <rect height="22" width="334" x="52" y="296.38" />
      <rect height="22" width="334" x="52" y="330.88" />
    </ContentLoader>
  )
}

AmazonLoader.metadata = {
  name: "Sarah Ann Garcia",
  github: "sgarcia30",
  description: "This is an Amazon sample product.", // Little tagline
  filename: "AmazonLoader",
}

export default AmazonLoader
