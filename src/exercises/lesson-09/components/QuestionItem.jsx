import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const { state, dispatch } = useContext(SurveyContext);
  // Checks whether question is being edited
  const editingQuestion = state.ui.editingQuestionId === question.id;
  // Holds state for new answer Text (used for a controlled component)
  const [answerText, setAnswerText] = useState({
    option: '',
    index: null,
  });
  // Checks whether the newInput btn was clicked
  const [newInput, setNewInput] = useState(false);

  // Holds state for the input text that will be added (used for a controlled component)
  const [inputText, setInputText] = useState('');

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    // Hint: Use SET_EDITING_QUESTION action
    dispatch({ type: 'SET_EDITING_QUESTION', payload: question });
  };

  const handleCancel = () => {
    setWorkingText(question.question);
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { id: null } });
  };
  // TODO: Students will add save functionality here
  const handleSave = () => {
    console.log('TODO: Implement save functionality');
    // Hint: Use UPDATE_QUESTION_TEXT action with workingText
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { ...question, newText: workingText },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    console.log('TODO: Implement delete functionality');
    const prompt = window.confirm(
      'Are you sure you want to delete this question?'
    );
    if (prompt) {
      dispatch({ type: 'DELETE_QUESTION', payload: { id: question.id } });
    }
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
  };

  // Choose the option that need to be edited
  const handleEditOptions = (option, index) => {
    setAnswerText({ option, index });
  };

  // Sends the option to dispatch to be updated
  const editOptionText = () => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        newText: answerText.option,
        id: question.id,
        optionIndex: answerText.index,
      },
    });
    setAnswerText({});
  };

  // Delete Option from Options List
  const deleteOption = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { id: question.id, optionIndex: index },
    });
  };

  // Adds a new input to the options list
  const addNewInput = () => {
    dispatch({
      type: 'ADD_OPTION_TO_QUESTION',
      payload: { id: question.id, optionText: inputText },
    });
    setInputText('');
    setNewInput(false);
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* TODO: Students add Edit and Delete buttons here */}
          {editingQuestion ? (
            <input
              type="text"
              value={workingText}
              onChange={(e) => setWorkingText(e.target.value)}
            />
          ) : null}
          {editingQuestion ? (
            <button className={styles['save-btn']} onClick={() => handleSave()}>
              Save
            </button>
          ) : null}
          <button
            className={styles['edit-btn']}
            onClick={!editingQuestion ? handleEdit : handleCancel}
          >
            {editingQuestion ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete (TODO)
          </button>
        </div>
      </div>

      {/* TODO: Students will add conditional controlled form to edit question here */}
      <div className={styles['question-content']}>
        <h3>{question.question}</h3>
      </div>

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE && (
        <div className={styles['options-section']}>
          <h4>Answer Options:</h4>
          <ul>
            {question.options.map((option, index) => (
              <li key={index} className={styles['option-item']}>
                <span className={styles['option-text']}>{option}</span>
                {index === answerText.index ? (
                  <input
                    type="text"
                    value={answerText.option}
                    onChange={(e) =>
                      setAnswerText((prev) => ({
                        ...prev,
                        option: e.target.value,
                      }))
                    }
                  />
                ) : null}
                <div className={styles['edit-btn-options']}>
                  {index !== answerText.index ? (
                    <button
                      onClick={() => handleEditOptions(option, index)}
                      className={styles['edit-btn']}
                    >
                      Edit Option
                    </button>
                  ) : (
                    <button
                      onClick={editOptionText}
                      className={styles['save-btn']}
                    >
                      {' '}
                      Save{' '}
                    </button>
                  )}
                  <button
                    disabled={question.options.length < 3}
                    onClick={() => deleteOption(index)}
                    className={styles['delete-btn']}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            <button
              className={styles['add-option']}
              onClick={() => setNewInput(true)}
            >
              +
            </button>
            {newInput ? (
              <div className={styles.newInput}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter new option"
                />
                <div className={styles['new-input-btns']}>
                  <button onClick={addNewInput} className={styles['save-btn']}>
                    Submit
                  </button>
                  <button
                    onClick={() => setNewInput(false)}
                    className={styles['delete-btn']}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
}
