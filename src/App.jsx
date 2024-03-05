import './styles/App.css'
import PostList from "./Component/PostList.jsx";
import {useEffect, useState} from "react";
import PostForm from "./Component/PostForm.jsx";
import PostFilter from "./Component/PostFilter.jsx";
import MyModal from "./Component/UI/MyModal/MyModal.jsx";
import MyButton from "./Component/UI/button/MyButton.jsx";
import {usePosts} from "./hooks/usePosts.js";
import PostService from "./API/PostService.js";
import Loader from "./Component/UI/Loader/Loader.jsx";
import {useFetching} from "./hooks/useFetching.js";

function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
        const posts = await PostService.getAll()
        setPosts(posts)
    })

    useEffect(() => {
        fetchPosts()
    }, []);

    const createPost = (newPost)  => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
            setPosts(posts.filter(p => p.id !== post.id))
    }


    return(
        <div className='App'>
            <button onClick={fetchPosts}>GET POSTS</button>

            <MyButton style={{marginTop: 25}} onClick={() => setModal(true)}>
                New Profile
            </MyButton>

             <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{margin:'15px'}}/>
            <div>

                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                {isPostsLoading
                    ?   <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                    :   <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts List'/>
                }
            </div>
        </div>
    )
}

export default App




// {id: 1, title: '11111', body: '333333' },
// {id: 2, title: '22222', body: '222222' },
// {id: 3, title: '33333', body: '111111' },