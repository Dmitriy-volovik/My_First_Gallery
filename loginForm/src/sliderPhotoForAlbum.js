let executeSlider = (linkThis, albumID) =>{
    // debugger;
    
    let index = linkThis.state.photoIndex +1;
    linkThis.setState({ photoIndex: index })
    if (linkThis.props.fetchStatusForCover.albums[albumID]){
        if (index < linkThis.props.fetchStatusForCover.albums[albumID].length) {
            linkThis.setState({
                img:
                    `http://localhost:8000/${linkThis.props.fetchStatusForCover.albums[linkThis.props.album.id][index].filename}`
            });
            // console.log(`before, ${timerId}`);
            linkThis.setState({
                timerId: setInterval(() => {
                    index++;
                    if (index < linkThis.props.fetchStatusForCover.albums[albumID].length) {
                        linkThis.setState({
                            img:
                                `http://localhost:8000/${linkThis.props.fetchStatusForCover.albums[linkThis.props.album.id][index].filename}`
                        });
                    }
                    else {
                        index = 0;
                        linkThis.setState({
                            img:
                                `http://localhost:8000/${linkThis.props.fetchStatusForCover.albums[linkThis.props.album.id][index].filename}`
                        });
                    }
                    linkThis.setState({ photoIndex: index })
                }, 1000),
            })

        } else {
            index = 0;
            linkThis.setState({
                img:
                    `http://localhost:8000/${linkThis.props.fetchStatusForCover.albums[linkThis.props.album.id][index].filename}`,
                photoIndex: index,
            });
        }
     } 
    }
   

export default executeSlider