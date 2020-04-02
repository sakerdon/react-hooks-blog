import React from 'react';
import {Link} from 'react-router-dom';
import { urlBuilder } from '~/routes';
import TagList from '~c/TagList';
import AddToFavorites from '~c/AddToFavorites';

export default function Feed({ articles }) {
    return (
        <div>
        {articles?.map((article, index) => (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              {/*<Link to={`/profiles/${article.author.username}`}>
                            <img src={article.author.image} alt="" />
                          </Link>*/}
              <div className="info">
                <Link
                  to={urlBuilder( 'profile', {user: article?.author?.username} )}
                  className="author"
                >
                  {article?.author?.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>
            </div>
            <Link to={ urlBuilder('article', {id: article.slug})} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
            </Link>
            <TagList tagList={article.tagList}/>
            <AddToFavorites 
              isFavorited={article.favorited}
              articleId={article.slug}
              favoritesCount={article.favoritesCount}
            />
            <hr />
          </div>
        ))}
      </div>
      )
}