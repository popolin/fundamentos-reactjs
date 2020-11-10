import React, { useState } from 'react';
import { useHistory, RouteProps } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = ({ location }: RouteProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      await Promise.all(
        uploadedFiles.map(uploadedFile => {
          const data = new FormData();
          data.append('file', uploadedFile.file);
          return api
            .post('/transactions/import', data, config)
            .then(response => response.data);
        }),
      );
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  function submitFile(files: File[]): void {
    const convertedFiles: FileProps[] = files.map<FileProps>(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));
    setUploadedFiles([...uploadedFiles, ...convertedFiles]);
  }

  return (
    <>
      <Header size="small" path={location?.pathname} />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
