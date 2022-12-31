import { connect } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createNew(content);
    props.setNotificationWithTimeout(`you created '${content}'`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createNew,
  setNotificationWithTimeout,
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);

