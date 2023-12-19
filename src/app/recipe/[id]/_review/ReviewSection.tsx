import { api } from "~/trpc/server";
import ReviewFormHandler from "./ReviewFormHandler";
import ReviewCard from "./ReviewCard";

export default async function ReviewSection({
  recipeId,
  showReviewForm = true,
}: {
  recipeId: string;
  showReviewForm?: boolean;
}) {
  const otherReviews = await api.review.getOthers.query({ recipeId });

  const myReview = await api.review.getMyReview.query({
    recipeId,
  });

  return (
    <section className="flex flex-col items-center">
      {showReviewForm && (
        <ReviewFormHandler recipeId={recipeId} myReviewQuery={myReview} />
      )}
      {otherReviews && otherReviews.length > 0 && (
        <div className="mt-4 flex justify-center gap-2">
          {otherReviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      )}
    </section>
  );
}
