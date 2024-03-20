import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import truncate from './truncate';

export default function Card({blog}){

    
    const truncatedBody = truncate(blog.body, 50);

    return (
        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">#{blog.tags}</h6>
                                <p className="card-text">
                                <ReactQuill
                                    value={truncatedBody}
                                    readOnly={true}
                                    theme={"bubble"}
                                    />
                                </p>
                                <a href=""><button className="btn btn-primary">Read</button></a>
                            </div>
        </div>
    )
}