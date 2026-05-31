import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const { state, dispatch } = useContext(SurveyContext);
  const editingQuestion = state.ui.editingQuestionId === question.id;
  const [answerText, setAnswerText] = useState({});
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
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
  };

  // Choose the option that need to be edited
  const handleEditOptions = (option, index) => {
    console.log(option, index);
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

  const deleteOption = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { id: question.id, optionIndex: index },
    });
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
                {index !== answerText.index ? (
                  <button onClick={() => handleEditOptions(option, index)}>
                    Edit Option
                  </button>
                ) : (
                  <button onClick={editOptionText}> Save </button>
                )}
                <button
                  disabled={question.options.length < 3}
                  onClick={() => deleteOption(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
