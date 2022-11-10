import Carousel from "@Components/Carousel";
import Image from "next/image";
import Img from "next/future/image";
import { useState, Suspense } from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function ProductGallery({
  images,
  dimensions,
}: {
  images: string[];
  dimensions: { width: number; height: number }[];
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="product-gallery">
      <div className="product-gallery__container">
        <div className="product-gallery__images">
          <ul>
            {images.map((url, i) => (
              <li key={url}>
                <button
                  className={
                    i == activeImage ? "product-gallery__thumb-active" : ""
                  }
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    objectFit="contain"
                    src={url}
                    width={80}
                    height={60}
                    layout="responsive"
                    alt=""
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-gallery__picture">
          <div className="product-gallery__picture-container">
            <Carousel
              onUpdate={(i: number) => setActiveImage(i)}
              aIndex={activeImage}
              //   key={product.id + "carousel"}
            >
              {images.map((url, i) => (
                <Img
                  key={"image:" + url}
                  style={{
                    objectPosition: "top",
                    objectFit: "contain",
                    height: "100%",
                    position: "static",
                  }}
                  src={url}
                  width={dimensions[i].width}
                  height={dimensions[i].height}
                  alt=""
                />
              ))}
            </Carousel>
          </div>
          <button className="product-gallery__wish">
            <AiOutlineHeart />
          </button>
        </div>
      </div>
    </div>
  );
}