// Mansoes.js
import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import mansoesData from '../../assets/mansoes/mansoes.json';
import styles from './Mansoes.module.css';
import { Button } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Footer } from '../../components/Footer';

export function Mansoes({ carrinho, setCarrinho }) {
    const [mansoes, setMansoes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const mansoesPerPage = 9;
    const [detalhesVisible, setDetalhesVisible] = useState(false);
    const [detalhesMansao, setDetalhesMansao] = useState(null);

    useEffect(() => {
        setMansoes(mansoesData.mansoes);
    }, []);

    const indexOfLastMansao = currentPage * mansoesPerPage;
    const indexOfFirstMansao = indexOfLastMansao - mansoesPerPage;
    const currentMansoes = mansoes.slice(indexOfFirstMansao, indexOfLastMansao);

    const renderMansoes = () => {
        return currentMansoes.map((mansao) => (
            <div key={mansao.NomeMansoes} className={styles.mansaoItem}>
                <h2>{mansao.NomeMansoes}</h2>
                <img src={mansao.ImgMansoes} alt={mansao.NomeMansoes} />
                <p>Preço: R${mansao.PrecoMansoes}</p>
                <div className={styles.buttonsContainer}>
                    <Button colorScheme="green" className={styles.doarButton} onClick={() => adicionarAoCarrinho(mansoes)}>
                        Adicionar ao carrinho
                    </Button>
                    <Button colorScheme="blue" className={styles.detalhesButton} onClick={() => exibirDetalhes(mansoes)}>
                        ?
                    </Button>
                </div>
            </div>
        ));
    };

    const totalPages = Math.ceil(mansoes.length / mansoesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pagination = [];

        for (let i = 1; i <= totalPages; i++) {
            pagination.push(
                <button
                    key={i}
                    className={currentPage === i ? styles.activePageButton : styles.pageButton}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return pagination;
    };

    const exibirDetalhes = (mansao) => {
        setDetalhesMansao(mansao);
        setDetalhesVisible(true);
    };

    const fecharDetalhes = () => {
        setDetalhesVisible(false);
        setDetalhesMansao(null);
    };

    const adicionarAoCarrinho = (mansao) => {
        const itemExistente = carrinho.find((item) => item.nome === mansao.NomeMansoes);
        if (itemExistente) {
            const novoCarrinho = carrinho.map((item) => {
                if (item.nome === mansao.NomeMansoes) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1,
                    };
                }
                return item;
            });
            setCarrinho(novoCarrinho);
        } else {
            const novoCarrinho = [
                ...carrinho,
                { id: mansao.NomeMansoes, nome: mansao.NomeMansoes, preco: mansao.PrecoMansoes, quantidade: 1 },
            ];
            setCarrinho(novoCarrinho);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.mansoesGrid}>
                {renderMansoes()}
            </div>

            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <button className={styles.pageButton} onClick={() => handlePageChange(currentPage - 1)}>
                        &lt;
                    </button>
                )}

                {renderPagination()}

                {currentPage < totalPages && (
                    <button className={styles.pageButton} onClick={() => handlePageChange(currentPage + 1)}>
                        &gt;
                    </button>
                )}
            </div>

            <Modal isOpen={detalhesVisible} onClose={fecharDetalhes} size="md">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{detalhesMansao?.NomeMansoes}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>{detalhesMansao?.DescMansoes}</p>
                        <p>Preço: R${detalhesMansao?.PrecoMansoes}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={fecharDetalhes}>
                            Fechar
                        </Button>
                        <Button colorScheme="green" onClick={() => adicionarAoCarrinho(detalhesMansao)}>
                            Adicionar ao Carrinho
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}
