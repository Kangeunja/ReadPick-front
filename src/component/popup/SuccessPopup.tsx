import "../../assets/css/ReviewSubmitSuccessPopup.css";

interface Props {
  message: string;
  onFinish: () => void;
}

const SuccessPopup = ({ message }: Props) => {
  return (
    <div className="review-success__popup">
      <div className="review-success__popup-box">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SuccessPopup;
