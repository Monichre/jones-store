import { Review, User } from "@prisma/client";
import { useState, useEffect } from "react";
import Button from "./common/formControls/Button";
import TextField from "./common/formControls/TextField";
import Form from "./Form";
import Modal from "./Modal";
import moment from "moment";

export default function Reviews({ productId }: { productId: string }) {
  const [reviewModal, setReviewModal] = useState(false);
  const [reviews, setReviews] = useState<(Review & { user: User })[]>([]);

  useEffect(() => {
    fetch(`/api/products/${productId}/review`)
      .then((res) => res.json())
      .then((res) => setReviews(res.data));
  }, [productId]);

  return (
    <div className="product-view__details-panel product-view__reviews-panel">
      <button onClick={() => setReviewModal(true)}>Write A Review</button>{" "}
      <Modal
        title="Write Review"
        visible={reviewModal}
        onClose={() => setReviewModal(false)}
      >
        <div>
          <Form
            method="POST"
            action={`/api/products/${productId}/review`}
            afterSubmit={(data, status) => {
              console.log(data, status);
            }}
          >
            <input type="number" name="rating" min="0" max="5" />
            <TextField name="body" multiline label="Your review" />
            <Button>Submit Review</Button>
          </Form>
        </div>
      </Modal>
      <div className="review">
        {reviews.map((review) => (
          <div key={review.userId + review.productId}>
            <div>{review.user.username}</div>
            <div>{review.rating}</div>
            <div>{review.comment}</div>
            <div title={moment(review.addedAt).format("MMM Do YY")}>{moment(review.addedAt).fromNow()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
