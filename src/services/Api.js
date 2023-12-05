import api from './axios-api'
class Api{
     getAllCategory(){
        return api.get('/category');
    }
     getAllLesson(userId, categoryId, courseId){
        return api.post('/lesson/get-all-lesson', {userId, categoryId, courseId})
    }
    getWordsForLesson(wordIds){
        return api.post('/word/get-by-id-array', {wordIdArray:wordIds})
    }
    getQuizByLessonId(lessonId){
        return api.get('/quiz/'+ lessonId);
    }
    updateUserLessonStatus(status, updateAt, lessonId, userId){
        return api.post('/lesson/update-status', {status, updateAt, lessonId, userId});
    }
    getDataForHome(userId, categoryId){
        return api.post('/lesson/get-data-for-home-page',{ userId, categoryId})
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();