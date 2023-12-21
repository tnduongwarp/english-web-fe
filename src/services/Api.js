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
    getLessonById(lessonId){
        return api.get('/lesson/'+ lessonId);
    }
    getAllUser(){
        return api.get('/user/')
    }
    deleteUserById(id){
        return api.post('/user/delete/'+id)
    }
    getListLessonForAdmin(courseId, categoryId){
        return api.post('/lesson/list-lesson-for-admin',{courseId,categoryId})
    }
    addListeningLesson(categoryId,title,content,url){
        return api.post('/lesson/add-listening',{categoryId,title,content,url})
    }
    addReadingLesson(categoryId,title,content){
        return api.post('/lesson/add-reading',{categoryId,title,content})
    }
    addQuiz(questions, lessonId){
        return api.post('/quiz/add-quiz',{questions,lessonId})
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Api();