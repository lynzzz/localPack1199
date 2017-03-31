import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

class Photo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			photos:null, 
			pageNum:1, 
			totalPages:1, 
			loadedAll: false, 
			currentImage:0
		};
		
	}

	openLightbox = (index, event)=>{
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true
		});
	} 

	closeLightbox = ()=>{
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}

	render() {
		const PHOTO_SET = [
			{
			src: '/imgs/IMG_20170311_120345.jpg',		
			srcset: [
				'/imgs/IMG_20170311_120345.jpg 4208w',
			],
			sizes:[
				'(min-width: 480px) 50vw',
				'(min-width: 1024px) 33.3vw',
				'100vw'
			],	
			width: 840,
			height: 624,
			alt: 'image 1',
			}
		];
	
		return (
			<div className="container" >
				<Gallery photos={PHOTO_SET} onClickPhoto={this.openLightbox}/>     
				<Lightbox 
					currentImage={this.state.currentImage}
					isOpen={this.state.lightboxIsOpen}
					width={1600}
				/>
			</div>
		);
	};
}
export default Photo;